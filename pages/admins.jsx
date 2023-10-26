import ButtonPrimary from "@/components/atoms/ButtonPrimary";
import FieldInput from "@/components/molecules/FieldInput";
import Layout from "@/components/templates/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import ButtonDanger from "@/components/atoms/ButtonDanger";
import { withSwal } from "react-sweetalert2";
import Label from "@/components/atoms/Label";
import { normalDate } from "@/lib/date";
import Spinner from "@/components/atoms/Spinner";

function AdminsPage({ swal }) {
  const [email, setEmail] = useState("");
  const [admins, setAdmins] = useState([]);
  const [editedAdmin, setEditedAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchAdmins();
  }, []);

  function fetchAdmins() {
    setIsLoading(true);
    axios.get("/api/admins").then((response) => {
      setAdmins(response.data);
      setIsLoading(false);
    });
  }

  async function saveAdmin(e) {
    e.preventDefault();
    const data = { email };
    if (editedAdmin) {
      data._id = editedAdmin._id;
      await axios.put("/api/admins", data);
      setEditedAdmin(null);
    } else {
      try {
        await axios.post("/api/admins", data);
      } catch (error) {
        console.log(error);
        swal.fire({
          icon: "error",
          title: "Error!",
          text: error.response.data.message,
        });
      }
    }
    setEmail("");
    fetchAdmins();
  }

  function editAdmin(admin) {
    setEditedAdmin(admin);
    setEmail(admin.email);
  }

  function deleteAdmin(admin) {
    swal
      .fire({
        title: "Uwaga",
        text: `Czy na pewno chcesz usunąć ${admin.email}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Nie",
        confirmButtonText: "Tak",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { _id } = admin;
          await axios.delete("/api/admins?_id=" + _id);
          fetchAdmins();
          swal.fire(
            "Usunięto!",
            `Administrator ${admin.email} został usunięty`,
            "success"
          );
        }
      });
  }

  return (
    <Layout>
      <form onSubmit={saveAdmin}>
        <Label>
          {editedAdmin
            ? `Edytuj administratora ${editedAdmin.email}`
            : "Dodaj administratora"}
        </Label>
        <FieldInput
          labelText={<span>Adres email</span>}
          type="text"
          placeholder="adres email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="flex gap-1">
          {editedAdmin && (
            <ButtonDanger
              onClick={() => {
                setEditedAdmin(null);
                setEmail("");
              }}
            >
              Anuluj
            </ButtonDanger>
          )}
          <ButtonPrimary>Zapisz</ButtonPrimary>
        </div>
      </form>
      {!editedAdmin && (
        <table className="primary-table mt-5">
          <thead>
            <tr>
              <th>Adres email</th>
              <th>Data utworzenia</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={3}>
                  <Spinner />
                </td>
              </tr>
            )}
            {admins.length > 0 &&
              admins.map((admin) => (
                <tr key={admin._id}>
                  <td>{admin.email}</td>
                  <td>{admin.createdAt && normalDate(admin.createdAt)}</td>
                  <td>
                    <ButtonPrimary
                      onClick={() => editAdmin(admin)}
                      className="mr-2"
                    >
                      Edytuj
                    </ButtonPrimary>
                    <ButtonDanger onClick={() => deleteAdmin(admin)}>
                      Usuń
                    </ButtonDanger>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => <AdminsPage swal={swal} />);
