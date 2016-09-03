export const asyncRequest = (handler) =>
  (req, res) => {
    handler(req, res).catch(e =>
      res.status(400).send({ error: e.toString() })
    );
  };
