module.exports = Base;

function Base(app, Model) {
  this.app = app;
  this.model = new Model();
}

Base.prototype.handle = function () {
  throw new Error('Child object needs to implement this function :)');
};