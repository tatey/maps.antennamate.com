describe('watts', function() {
  var filter;

  beforeEach(function() {
    module('am');

    inject(function(wattsFilter) {
      filter = wattsFilter;
    });
  });

  it('is formatted as watts when less than 1000 watts', function() {
    expect(filter(1.0)).toBe('1 w');
    expect(filter(999.0)).toBe('999 w');
  });

  it('is formatted as kilowatts when less than 1 megawatt', function() {
    expect(filter(1000.0)).toBe('1 kW');
    expect(filter(989999.0)).toBe('990 kW');
  });

  it('is formatted as megawatts when greater than or equal to 1 megawatt', function() {
    expect(filter(1000000.0)).toBe('1 MW');
    expect(filter(9899999.0)).toBe('9.90 MW');
  });
});
