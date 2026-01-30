import app from "./app";

const PORT = (process.env.SERVER_PORT || 9000) as number;

app.listen(PORT, () => {
  console.log(`[#] +${PORT}`);
});
