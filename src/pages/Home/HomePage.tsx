import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth.utils";
import { useLogout } from "../../hooks/useLogout";
import { useUploadTrip } from "../../hooks/useUploadTrip";

interface UploadFormValues {
  file: FileList;
}

export default function HomePage() {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit
  } = useForm<UploadFormValues>();
  const { logout } = useLogout();
  const { upload, loading, error } = useUploadTrip()

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [navigate]);

  const onSubmit = async(data: UploadFormValues) => {
    try {
    const file = data.file[0]
    await upload(file)
    alert("Trip uploaded successfully")
  } catch {
    // handled in hook
  }
  };

  return (

    <div style={{ maxWidth: "700px", margin: "auto", paddingTop: "40px" }}>

      {/* Header Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px"
        }}
      >
        <h2>Vehicle Tracking System</h2>

        <button
          onClick={logout}
          style={{
            padding: "8px 16px",
            backgroundColor: "#ff4d4f",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>

      </div>

      {/* Upload Form */}

      <h3>Upload GPS CSV File</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit(onSubmit)}>

        <input
          type="file"
          accept=".csv"
          {...register("file", {
            required: "CSV file is required"
          })}
        />

        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload Trip"}
        </button>

      </form>

    </div>

  );
}