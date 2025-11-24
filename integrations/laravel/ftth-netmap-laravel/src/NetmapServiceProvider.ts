import { Application } from 'express';

export default class NetmapServiceProvider {
  constructor(private readonly app: Application) {}

  boot() {
    // Preconfigure iframe route for embedding SPA
    this.app.get('/netmap', (_req, res) => {
      res.send('<iframe src="https://netmap.localhost/web" style="width:100%;height:720px;border:0;"></iframe>');
    });
  }
}
