import jwt from 'jsonwebtoken';

export function auth(requiredRole) {
  return (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ message: 'Token manquant' });
    const token = header.split(' ')[1];
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
      if (requiredRole && payload.role !== requiredRole) {
        return res.status(403).json({ message: 'Accès refusé' });
      }
      req.user = payload;
      next();
    } catch (e) {
      return res.status(401).json({ message: 'Token invalide' });
    }
  };
}
