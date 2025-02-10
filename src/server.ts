import app from "./app";

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000; // Convert to number

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
