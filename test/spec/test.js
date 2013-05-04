describe("sayHello", function(){
  it ("should return 'Hello World!'", function(){
    expect(app.sayHello()).to.equal("Hello World!");
  });
});