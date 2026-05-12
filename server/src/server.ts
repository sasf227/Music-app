import express from "express";
import cors from "cors"

const app = express();
const corsOptions = {
    origin: ["http://localhost:5173"],
};
app.use(cors(corsOptions))
app.use(express.json());

app.get("/", (req, res) => {
    res.json("hello world")
})
app.get("/api", (req, res) => {
    res.json({
        blogPost: [
            {
                title: "Music introduction in basics of improvising",
                content: "Just music intro.",
            },
            {
                title: "Music introduction in basics of improvising",
                content: "Just music intro.",
            },
            {
                title: "Music introduction in basics of improvising",
                content: "Just music intro.",
            },
            {
                title: "Music introduction in basics of improvising",
                content: "Just music intro.",
            },
            {
                title: "Music introduction in basics of improvising",
                content: "Just music intro.",
            }
    ]});
});

app.post("/log", (req, res) => {
    console.log(JSON.stringify(req.body));

    res.sendStatus(200)
})


app.listen(8070, () => {
    console.log("Server started on port 8080")
})