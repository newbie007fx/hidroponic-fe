import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import plantService from "../../services/plant.service";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

function HarvestModel({ id, isOpen, toggle }) {
  let navigate = useNavigate();
  const [yields, setYields] = useState(0);
  const [valid, setValid] = useState(true);

  const harvestPlant = () => {
    if (!valid || yields === 0) {
      setValid(false);
      return;
    }

    let data = {
      yields: parseInt(yields),
      id: parseInt(id)
    };

    plantService.harvestPlant(data).then(
      (response) => {
        let data = response.data?.is_success;
        if (data) {
          toast.success("plant has been successfully updated");
          navigate("/plants")
        }
      }).catch(
        (error) => {
          console.log(error);
        }
      );
  }

  const onYieldsChange = (e) => {
    let value = parseInt(e.target.value);
    if (value <= 0) {
      setValid(false);
      return;
    }

    setValid(true);
    setYields(value);
  }

  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Harvest Plant?</ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="col mb-3">
              <label for="yields" className="form-label">Yields</label>
              <input type="number" id="yields" className={valid ? "form-control" : "form-control  is-invalid"}
                value={yields}
                onChange={onYieldsChange}
              />
              <div className="invalid-feedback">yields must be set more than 0</div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={harvestPlant}>
            Harvest
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default HarvestModel;