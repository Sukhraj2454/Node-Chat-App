const moment = require('moment');

var generateMessage = (from, text)=>{
  return {
      from,
      text,
      createdAt : moment().valueOf()
  };
};

var generateLocationMessage = (from, latitude, longitude) =>{

  return{
    from:'Admin',
    url:`https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt: moment().valueOf()
  }
};

module.exports = {generateMessage, generateLocationMessage};
