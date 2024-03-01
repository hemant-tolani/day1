import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function PostPolicyAddOn() {
  const location = useLocation();
  const navigate = useNavigate();
  const [policies, setPolicies] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [policyId, setPolicyId] = useState("");
  const [submissionMessage, setSubmissionMessage] = useState("");
  const username = sessionStorage.getItem('username');

  useEffect(() => {
    if (location.state) {
      setName(location.state.name);
      setDescription(location.state.description);
      setPrice(location.state.price);
    }

    fetch(`http://localhost:5146/api/Policy?username=${username}`)
      .then(res => res.json())
      .then(data => {
        const userPolicy = data.find(policy => policy.username === username);
        if (userPolicy) {
          setPolicyId(userPolicy.policyId);
        }
      })
      .catch(err => console.error("Error fetching policies:", err));
  }, [location, username]);

  const handleSubmit = () => {
    const temp_policyaddon = {
      name,
      description,
      price,
      policyId,
      username,
    };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(temp_policyaddon)
    };

    fetch("http://localhost:5146/api/PolicyAddOn", requestOptions)
      .then(res => {
        if (!res.ok) throw new Error('Failed to submit policy add-on.');
        return res.json();
      })
      .then(res => {
        setSubmissionMessage("Policy add-on successfully ACTIVE.");
        setTimeout(() => {
          navigate('/welcome/{username}'); // Redirect to the welcome page after showing message
        }, 5000); // Redirect after 5 seconds
      })
      .catch(err => {
        console.error("Error submitting policy add-on:", err);
        setSubmissionMessage("Failed to submit policy add-on.");
      });
  };

  return (
    <div className="alert alert-success divregister">
      <label className="form-control">Name of the Policy Add On</label>
      <input className="form-control" type="text" value={name} readOnly />

      <label className="form-control">Description about the Policy Add On</label>
      <input className="form-control" type="text" value={description} readOnly />

      <label className="form-control">Price of Add On</label>
      <input className="form-control" type="number" value={price} onChange={e => setPrice(e.target.value)} />

      {submissionMessage && <div>{submissionMessage}</div>}
      
      <button onClick={handleSubmit} className="btn btn-success">Submit Information</button>
      <button className="btn btn-danger">Cancel</button>
    </div>
  );
}

export default PostPolicyAddOn;
