class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  //saearches for the query string in the query object
  search() {
    const keyword = this.queryString.keyword
      ? {
          name: {
            $regex: this.queryString.keyword,
            $options: "i",
          },
        }
      : {};
    // console.log(keyword);

    this.query = this.query.find({ ...keyword });
    return this;
  }

  //filters the query object by the query string

  filter() {
    const queryCopy = { ...this.queryString };
    const excludedFields = [
      "keyword",
      "page",
      "sort",
      "limit",
      "fields",
    ];
    excludedFields.forEach((el) => delete queryCopy[el]);

    //1B) Advanced filtering for price
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  //pagination

  pagination(resultPerPage) {
    //*1 because str is a string we are converting into number by multiplyin 1
    const currentPage = this.queryString.page * 1 || 1;

    //skip is the number of documents to skip
    const skip = (currentPage - 1) * resultPerPage;

    //limit is the number of documents to return
    this.query = this.query.skip(skip).limit(resultPerPage);

    return this;
  }
}

module.exports = ApiFeatures;
