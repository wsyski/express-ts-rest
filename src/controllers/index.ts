export module IndexController {
  export function indexAction(req, res, next) {
    res.json({ article: 'index' });
  }
  export function quickstartAction(req, res, next) {
    res.json({ article: 'quickstart' });
  }
}

export default IndexController;
