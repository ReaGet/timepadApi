// https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-5.0.9.zip
// Как вы смотрите на то, чтобы сотрудничать вне кворк?
import { MongoClient } from 'mongodb';
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

function Database() {
  this.db = client.db('db_records');
  this.db.listCollections({name: 'records'})
    .next((err, collinfo) => {
      if (!collinfo) {
        this.records = this.db.createCollection('records');
      } else {
        this.records = this.db.collection('records');
      }
    });

  this.connect();
}

Database.prototype.connect = function() {
  client.connect(
    (err, client) => {
      if (err) {
        console.log('Connection error: ', err);
        client.close()
        throw err;
      }
  
      console.log('Connected');
      // client.close()
    }
  )
};

Database.prototype.add = function(record) {
  const check = this.records.find({id_timepad: record.id_timepad});
  
  if (check) {
    check.toArray((e, docs) => {
      if (docs.length === 0) {
        this.records.insertOne(
          record,
          (err, result) => {
            if (err) {
              console.log('Не получилось добавить запись: ', err)
              throw err
            }
          }
        )
      } else {
        console.log(docs)
      }
    });
  }
};

export default Database;