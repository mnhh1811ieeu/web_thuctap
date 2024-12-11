const mongoose = require("mongoose");
const recentlyViewedSchema = mongoose.Schema({
    proId:{
        type:String,
        default: ''
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    images: [{
    type: String,
    required: true
}],
    brand: {
    type: String,
    default: ''
},
    price: {
    type: Number,
    default: 0
},
    oldPrice: {
    type: Number,
    default: 0
},
    catName:{
    type: String,
    default: ''
},
    category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
},
    countInStock: {
    type: Number,
    required: true,
},
    rating: {
    type: Number,
    default: 0,
},
//     numReviews: {
//     type: Number,
//     default: 0,
// },
    isFeatured: {
    type: Boolean,
    default: false,
},
discount:{
    type: Number,
    required: true,
},
productSIZE:[{
    type: String,
    default: null,
}]
    
,
    dateCreated: {
    type: Date,
    default: Date.now,
},

})
recentlyViewedSchema.virtual('id').get(function(){
    return this._id.toHexString();
});
recentlyViewedSchema.set('toJSON',{
    virtuals:true,
});
exports.RecentlyViewed = mongoose.model('RecentlyViewed', recentlyViewedSchema);