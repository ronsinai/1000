const Chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

Chai.use(chaiAsPromised);
const { expect } = Chai;

const { ImagingsCollection } = require('../../server/collections');
const exampleImaging = require('../data/imaging');
const { findDocument } = require('../utils/db');

describe('Imagings Collection', () => {
  before(() => {
    this.imagings = new ImagingsCollection();

    this.exampleImaging = exampleImaging;
    this.badImaging = { _id: 'partial' };
  });

  describe('#insert', () => {
    it('should insert imaging to database', async () => {
      const imaging = await this.imagings.insert(this.exampleImaging);
      expect(imaging).to.be.an('object');
      expect(imaging).to.have.all.keys(['_id', 'type', 'bodyPart', 'metadata', 'path', 'createdAt', 'updatedAt']);
      const document = await findDocument('imagings', imaging._id);
      expect(document).to.eql(imaging);
    });

    it('should fail partial imaging', async () => {
      await expect(this.imagings.insert(this.badImaging)).to.be.rejectedWith('"type" is required');
    });

    it('should create correct filter', () => {
      const filter = this.imagings._getFilter(this.exampleImaging);
      const { _id } = this.exampleImaging;
      expect(filter).to.eql({ _id });
    });
  });

  describe('#discharge', () => {
    it('should discharge imaging in database', async () => {
      let imaging = await this.imagings.insert(this.exampleImaging);
      imaging = await this.imagings.discharge(this.exampleImaging._id);
      expect(imaging).to.be.an('object');
      expect(imaging).to.have.all.keys(['_id', 'type', 'bodyPart', 'metadata', 'path', 'createdAt', 'updatedAt', 'discharged']);
      expect(imaging).to.have.property('discharged', true);
      const document = await findDocument('imagings', imaging._id);
      expect(document).to.eql(imaging);
    });

    it('should fail to discharge missing imaging in database', async () => {
      await expect(this.imagings.discharge(this.exampleImaging._id)).to.be.rejectedWith(`Could not discharge imaging ${this.exampleImaging._id}`);
    });
  });
});
