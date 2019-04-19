const path = require('path');
const assert = require('assert');
const electron = require('electron');
const Application = require('spectron').Application;

describe('Application launch', function() {
  this.timeout(10000);

  beforeEach(() => {
    this.app = new Application({
      path: electron,
      args: [path.join(__dirname, '..')]
    });
    return this.app.start();
  });

  afterEach(() => {
    if (this.app && this.app.isRunning()) {
      return this.app.stop();
    }
  });

  it('shows an initial window', async () => {
    const windowCount = await this.app.client.getWindowCount();
    assert.strictEqual(windowCount, 2)
  });

  it('shows the empty page on load', async () => {
    const text = await this.app.client.getText('.card-body p:first-child');
    assert.strictEqual(text, 'Something went wrong!');
  });
});
