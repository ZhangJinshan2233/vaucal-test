const knex = require('./knex');

class BaseService{
  constructor(props){
    this.table = props;
  }

  // get all
  getAll(){
    return knex(this.table).select("*");
  }

  // insert new object
  insert(params){
    return knex(this.table).insert(params);
  }

  //get object by id
  getOne(id){
    return knex(this.table).first().where('id', id);
  }
  // update object by id
  update(id, params){
    return knex(this.table).where('id',  id).update(params);
  }

  // delete object
  delete(id){
    return knex(this.table).where('id', id).del();
  }

}

module.exports = BaseService;