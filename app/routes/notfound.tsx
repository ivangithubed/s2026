import { Link } from "react-router"

const NotFoundPage = () => {
    return (
        <>
        <h1 style={{ textAlign: "center", marginTop: "20vh", fontSize: "3rem" }}>404 - Такої сторінки не знайдено</h1>
        <Link to="/" style={{ display: "block", textAlign: "center", marginTop: "2rem", fontSize: "1.5rem", color: "oklch(84.1% 0.238 128.85)" }}>Повернутися на головну</Link>
        </>
    )
}
export default NotFoundPage