export default function handler(req, res) {
res.setPreviewData({user:'Pradeep'})
res.redirect(req.query.redirect)
}