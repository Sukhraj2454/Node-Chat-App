var expect = require('expect');

var {generateMessage}=require('./message');

describe('generateMessage', ()=>{
  it('should generate Correct message object', () => {
    var from = 'Jen';
    var text = 'Add me to chat.';
    var message = generateMessage(from, text);

    expect(message.createdAt).toBe('number');
    expect(message).toInclude({from,text});
  });
});
