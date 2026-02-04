import Toast from "./components/common/Toast/Toast";
import { useNotice } from "./contexts/NoticeContext";
import MainRoute from "./routes/MainRoute/MainRoute";

export default function App() {
  const { toastMsg, toastVisible, setToastVisible } = useNotice();

  return (
    <>
      <Toast
        message={toastMsg}
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
      <MainRoute />
    </>
  );
}