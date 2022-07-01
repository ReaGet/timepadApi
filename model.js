import getCoordinatesByAddress from "./geoAPI.js";

function Model(record) {
  this.id_timepad = record.id;
  this.name = record.name;
  this.desc_short = record.description_short;
  this.desc_html = record.description_html;
  this.url = record.url;
  this.img_uploadcare = null;
  this.image_core_attachment = null;
  this.longitude = null;
  this.latitude = null;
  this.country = null;
  this.city = null;
  this.address_from_source = null;
  this.category = record.categories[0]?.name;
  this.date = record.starts_at;

  this.setAddress(record.location);
  this.setCoordinates(record.location);
  this.setPosterImage(record.poster_image);
}

Model.prototype.setCoordinates = function(location) {
  if (!location)
    return;
    
  if (location.coordinates) {
  	this.longitude = Number(location.coordinates[0]);
  	this.latitude = Number(location.coordinates[1]);
  }
};

Model.prototype.checkCoordinates = async function() {
  const address = [this.country, this.city, this.address_from_source].join('+');
  const coordinates = await getCoordinatesByAddress(address);
  this.longitude = coordinates.longitude; 
  this.latitude = coordinates.latitude;
}

Model.prototype.setAddress = function(location) {
  if (!location)
    return;

  this.country = location.country || '';
  this.city = location.city || '';
  this.address_from_source = location.address || '';
};

Model.prototype.setPosterImage = function(poster_image) {
  if (!poster_image)
    return;

  this.img_uploadcare = 'https:' + poster_image.uploadcare_url;
  this.image_core_attachment = [{
    url: 'https:' + poster_image.uploadcare_url
  }];
};

export default Model;