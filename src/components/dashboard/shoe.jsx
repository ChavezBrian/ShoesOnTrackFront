"use client";
import Link from "next/link";

const shoe = ({ shoe }) => {
    return (
      <div >
        <div >
        <div >
          <h2>SHOE</h2>
          <img
            src={shoe.image}
            alt={shoe.name}
          />
          <h2 >{shoe.name}</h2>
          <div >
            <div>
              <Link href={`/admin/modify-shoe/${shoe.id}`}>
                <button>
                  
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                </button>
              </Link>

              <button
                onClick={() => handleChange(shoe.id)}
              >
                {statusEvent === "active" ? "Active" : "Inactive"}
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  };
  
  export default shoe;