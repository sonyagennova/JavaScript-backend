const Electronics = require("../models/Electronics")

exports.createElectronics = async(elData) => {
    const electronics = await Electronics.create(elData);
    return electronics;
}

exports.getAll = async() => await Electronics.find().lean();

exports.getSingle = (id) => Electronics.findById(id);

exports.buy = async(userId, electronicId) => {
    const electronic = await Electronics.findById(electronicId).lean();
    electronic.buyingList.push(userId);
    await Electronics.findByIdAndUpdate(electronicId, electronic);
    return electronic;
}

exports.update = (id, elData) => Electronics.findByIdAndUpdate(id, elData);

exports.delete = (id) => Electronics.findByIdAndDelete(id);

exports.search = async (name, type) => {
    let electronics = await this.getAll();

  
    if (name) {
        electronics = electronics.filter(x => x.name == name);
    }

    if(type){
        electronics = electronics.filter(x => x.type == type);
    }

    return electronics;
}