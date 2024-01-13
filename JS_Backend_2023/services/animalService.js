const Animal = require('../models/Animal');

exports.getAll = () => Animal.find({}).lean();

exports.getAllByDate = () => Animal.find({}).sort({createdOn: -1}).limit(3).lean();

exports.getOne = (animalId) => Animal.findById(animalId).lean();

exports.search = async (location) => {
    let animal = await this.getAll();

  
    if (location) {
        animal = animal.filter(x => x.location == location);
    }

    return animal;
}

exports.donate = async (userId, animalId) => {

    const animal = await Animal.findById(animalId);
    animal.donations.push(userId);
    return animal.save();

}

exports.create = (ownerId, animalData) => Animal.create({...animalData, owner: ownerId});

exports.edit = (animalId, animalData) => Animal.findByIdAndUpdate(animalId, animalData, {runValidators: true});

exports.delete = (animalId) => Animal.findByIdAndDelete(animalId);