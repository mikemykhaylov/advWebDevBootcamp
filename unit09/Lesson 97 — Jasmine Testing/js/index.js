const Earth = {
  isRound: true,
  numberFromSun: 3,
};
describe('Earth', () => {
  it('is round', () => {
    expect(Earth.isRound).toBe(true);
  });
  it('is 3rd planet from sun', () => {
    expect(Earth.numberFromSun).toBe(3);
  });
});

describe('A spy', () => {
  let foo;
  let bar = null;

  beforeEach(() => {
    foo = {
      setBar(value) {
        bar = value;
      },
    };

    spyOn(foo, 'setBar');

    foo.setBar(123);
    foo.setBar(456, 'another param');
  });

  it('tracks that the spy was called', () => {
    expect(foo.setBar).toHaveBeenCalled();
  });

  it('tracks that the spy was called x times', () => {
    expect(foo.setBar).toHaveBeenCalledTimes(2);
  });

  it('tracks all the arguments of its calls', () => {
    expect(foo.setBar).toHaveBeenCalledWith(123);
    expect(foo.setBar).toHaveBeenCalledWith(456, 'another param');
  });

  it('stops all execution on a function', () => {
    expect(bar).toBeNull();
  });

  it('tracks if it was called at all', () => {
    foo.setBar();

    expect(foo.setBar.calls.any()).toEqual(true);
  });
});

describe('Manually ticking the Jasmine Clock', () => {
  let timerCallback;

  beforeEach(() => {
    timerCallback = jasmine.createSpy('timerCallback');
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('causes a timeout to be called synchronously', () => {
    setTimeout(() => {
      timerCallback();
    }, 100);

    expect(timerCallback).not.toHaveBeenCalled();

    jasmine.clock().tick(101);

    expect(timerCallback).toHaveBeenCalled();
  });

  it('causes an interval to be called synchronously', () => {
    setInterval(() => {
      timerCallback();
    }, 100);

    expect(timerCallback).not.toHaveBeenCalled();

    jasmine.clock().tick(101);
    expect(timerCallback.calls.count()).toEqual(1);

    jasmine.clock().tick(50);
    expect(timerCallback.calls.count()).toEqual(1);

    jasmine.clock().tick(50);
    expect(timerCallback.calls.count()).toEqual(2);
  });
});
