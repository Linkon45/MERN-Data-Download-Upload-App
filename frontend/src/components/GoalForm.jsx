import { useState } from "react";
import { useDispatch } from "react-redux";
import { createGoal } from "../features/goals/goalSlice";

function GoalForm() {
  const [data, setData] = useState({
    text: "",
    image: "",
  });

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("image", data.image);
    formData.append("text", data.text);
    dispatch(createGoal(formData));
    setData({ text: "", image: "" });
    // setText("");
  };

  const handleChange = (text) => (e) => {
    const value = text === "image" ? e.target.files[0] : e.target.value;
    setData({ ...data, [text]: value });
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Goal</label>
          <input
            type="text"
            name="text"
            id="text"
            value={data.name}
            onChange={handleChange("text")}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="file"
            accept="image/*"
            name="image"
            onChange={handleChange("image")}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add Goal
          </button>
        </div>
      </form>
    </section>
  );
}

export default GoalForm;
