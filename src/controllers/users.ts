export module UsersController {
  export function indexAction(req, res, next) {
    res.json({ article: "users" });
  }
}

export default UsersController;