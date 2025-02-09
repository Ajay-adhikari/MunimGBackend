import app from "./app";

const PORT = process.env.PORT ? Number(process.env.PORT) : 8080; // Convert to number

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
