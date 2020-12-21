const Axios = require('axios');
const Chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

Chai.use(chaiAsPromised);
const { expect } = Chai;

const exampleDiagnosis = require('../data/diagnosis');

describe('Diagnoses Routes', () => {
  before(() => {
    this.exampleDiagnosis = exampleDiagnosis;
    this.badDiagnosis = { diagnosis: 'partial' };
  });

  describe('POST /diagnoses', () => {
    it('should post diagnosis', async () => {
      const result = await Axios.post('/diagnoses', this.exampleDiagnosis);
      const diagnosis = result.data;
      expect(diagnosis).to.be.an('object');
      expect(diagnosis).to.have.all.keys(['_id', 'imagingId', 'imagingType', 'diagnosis', 'createdAt', 'updatedAt']);
    });

    it('should fail partial diagnosis', async () => {
      await expect(Axios.post('/diagnoses', this.badDiagnosis)).to.be.rejectedWith('Request failed with status code 400');
    });
  });
});
