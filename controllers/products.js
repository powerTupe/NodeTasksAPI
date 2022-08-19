const Products  =  require('../models/product');

const getAllProduct = async (req, res) => {
    const { featured, company, name, sort, fields } = req.query;
    const queryObject = {};

    if(featured){
        queryObject.featured = featured === 'true' ? true : false;
    }

    if(company){
        queryObject.company = { $regex: company, $options: 'i' };
    }

    if(name){
        queryObject.name = { $regex: name, $options: 'i' };
    }

    
    let result = Products.find(queryObject);

    if(sort){
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    }else{
        result = result.sort('createdAt');
    }

    if(fields){
        const sortList = fields.split(',').join(' ');
        result = result.select(sortList);
    }

    const products = await result;
    console.log(queryObject);
    res.status(200).json({ nbHits : products.length, products});
}

const getAllProductStatic = async (req, res) => {
    const products = await Products.find({}).select('name price');
    res.status(200).json({ nbHits : products.length, products});
}
module.exports = {
    getAllProduct,
    getAllProductStatic
}