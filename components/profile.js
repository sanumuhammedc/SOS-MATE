import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';

export default function EditButton() {
  return (
    <div className="gradient-custom-2" style={{alignItems:'center',display: "flex",justifyContent: "center", }}>
      <MDBContainer>
        <MDBRow className="justify-content-center align-items-center">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <div className="rounded-top text-white d-flex flex" style={{ backgroundColor: '#f8f9fa', height: '300px' }}>
                <div className="d-flex flex-column" style={{ width: '150px' }}>
                  <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                    alt="Generic placeholder image" className=" mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />
                  <MDBBtn outline color="dark" style={{height: '36px', overflow: 'visible'}}>
                    Edit profile
                  </MDBBtn>
                </div>
                <div className="p-8 m-8 text-black">
                <div className="flex-column justify-content-center align-items-center text-center px-10 py-1">
                  <div>
                    <MDBCardText className="mb-2 h5">Name: NIHAL VADAKKAN</MDBCardText>
                  </div>
                  <div className="px-3">
                    <MDBCardText className="mb-2 h5">Age:21</MDBCardText>
                    
                  </div>
                  <div>
      
                    <MDBCardText className="small text-muted mb-0">Place:Malappuram</MDBCardText>
                  </div>
                </div>
              </div> 
                
              </div>
              
   {/*            <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                
              </div> */}
            </MDBCard>
            
          </MDBCol>
          
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
