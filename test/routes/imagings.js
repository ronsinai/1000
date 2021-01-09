const Axios = require('axios');
const Chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

Chai.use(chaiAsPromised);
const { expect } = Chai;

const exampleImaging = require('../data/imaging');

describe('Imagings Routes', () => {
  before(() => {
    this.exampleImaging = exampleImaging;
    this.badImaging = { _id: 'partial' };
  });

  describe('POST /imagings', () => {
    it('should post imaging', async () => {
      const result = await Axios.post('/imagings', this.exampleImaging);
      const imaging = result.data;
      expect(imaging).to.be.an('object');
      expect(imaging).to.have.all.keys(['_id', 'type', 'bodyPart', 'metadata', 'path', 'createdAt', 'updatedAt']);
    });

    it('should fail partial imaging', async () => {
      await expect(Axios.post('/imagings', this.badImaging)).to.be.rejectedWith('Request failed with status code 400');
    });
  });

  describe('PUT /imagings/<id>/discharge', () => {
    it('should discharge existing imaging', async () => {
      let result = await Axios.post('/imagings', this.exampleImaging);
      result = await Axios.put(`/imagings/${this.exampleImaging._id}/discharge`);
      const imaging = result.data;
      expect(imaging).to.be.an('object');
      expect(imaging).to.have.all.keys(['_id', 'type', 'bodyPart', 'metadata', 'path', 'createdAt', 'updatedAt', 'discharged']);
      expect(imaging).to.have.property('discharged', true);
    });

    it('should not discharge non-existing imaging', async () => {
      await expect(Axios.put(`/imagings/${this.exampleImaging._id}/discharge`)).to.be.rejectedWith('Request failed with status code 400');
    });
  });
});
