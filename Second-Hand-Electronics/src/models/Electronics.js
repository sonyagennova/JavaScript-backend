const mongoose = require("mongoose")

const electronicsSchema = new mongoose.Schema({
    name: {type: String, minLength: [10, "Name too short!"]},
    type: {type: String, minLength: [2, "Type description too short!"]},
    damages: {type: String, minLength: [10, "Damages description too short!"]},
    image: {type: String, match: /^(http|https):/},
    description: {type: String, minLength: [10, "Description too short!"], maxLength: [200, "Description too long!"]},
    production: {type: Number, min: [1900, "Use bigger year!"], max: [2023, "Use smaller year!"]},
    exploitation: {type:Number, min: [0, "Price should be a positive number!"]},
    price: {type:Number, min: [0, "Price should be a positive number!"]},
    buyingList: [],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
})

const Electronics = mongoose.model("Electronics", electronicsSchema);

module.exports = Electronics;