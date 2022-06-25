import { useDispatch } from "react-redux";
import { deleteGoal } from "../features/goals/goalSlice";
import axios from "axios";
import fileDownload from "js-file-download";
import { FaFileDownload } from "react-icons/fa";

function GoalItem({ goal }) {
  const dispatch = useDispatch();

  const handleDownload = (url, filename) => {
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };

  return (
    <div className="goal">
      <div>{new Date(goal.createdAt).toLocaleString("en-US")}</div>
      <img src={goal.imageURL} alt="" width={"100%"} height={200} />
      <h2>{goal.text}</h2>

      <button
        onClick={() => {
          handleDownload(goal.imageURL, `${goal.cloudinaryID}.jpg`);
        }}
      >
        <FaFileDownload /> Download
      </button>

      <button onClick={() => dispatch(deleteGoal(goal._id))} className="close">
        X
      </button>
    </div>
  );
}

export default GoalItem;
