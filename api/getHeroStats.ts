export const getHeroStats = async () => {
const res = await fetch('https://api.deadlock-api.com/v1/analytics/hero-stats')
return res.json()
}