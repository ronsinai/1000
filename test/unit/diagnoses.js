const Chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

Chai.use(chaiAsPromised);
const { expect } = Chai;

const { DiagnosesCollection } = require('../../server/collections');
const exampleDiagnosis = require('../data/diagnosis');
const { findDocument } = require('../utils/db');

describe('Diagnoses Collection', () => {
  before(() => {
    this.diagnoses = new DiagnosesCollection();

    this.exampleDiagnosis = exampleDiagnosis;
    this.badDiagnosis = { diagnosis: 'partial' };
  });

  describe('#insert', () => {
    it('should insert diagnosis to database', async () => {
      const diagnosis = await this.diagnoses.insert(this.exampleDiagnosis);
      expect(diagnosis).to.be.an('object');
      expect(diagnosis).to.have.all.keys(['_id', 'imagingId', 'imagingType', 'diagnosis', 'createdAt', 'updatedAt']);
      const document = await findDocument('diagnoses', diagnosis._id);
      expect(document).to.eql(diagnosis);
    });

    it('should fail partial diagnosis', async () => {
      await expect(this.diagnoses.insert(this.badDiagnosis)).to.be.rejectedWith('"imagingId" is required');
    });

    it('should create correct filter', () => {
      const filter = this.diagnoses._getFilter(this.exampleDiagnosis);
      const { imagingId, diagnosis } = this.exampleDiagnosis;
      expect(filter).to.eql({ imagingId, diagnosis });
    });
  });
});
