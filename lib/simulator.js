var Emitter = require('eventemitter2');
var onFrame = require('./frame').onFrame;
var Accumulator = require('./accumulator');

function Simulator() {
  if (!(this instanceof Simulator)) return new Simulator();

  Emitter.call(this);

  this._step = this._step.bind(this);
  this._stepInterval = 1000 / 60;     // TODO: option
  this._running = false;
  this._accumulator = undefined;
  this._particles = [];
}

Simulator.prototype = Object.create(Emitter.prototype);

Simulator.prototype.start = function() {
  this._running = true;
  this._accumulator = new Accumulator(this._stepInterval, 100);
  onFrame(this._step);
};

Simulator.prototype.add = function(entity) {
  if (entity.type === 'Particle') this._particles.push(entity);
};

Simulator.prototype.getParticles = function() {
  return this._particles;
}

Simulator.prototype._step = function() {
  if (!this._running) return;

  var time;
  var interval = this._accumulator.freeze();
  while (time = this._accumulator.next()) {
    this._simulate(interval, time);
  }

  onFrame(this._step);
};

Simulator.prototype._simulate = function(time, totalTime) {

};

module.exports = Simulator;