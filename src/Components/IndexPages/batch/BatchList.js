import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBatchList, removeBatch } from "./../../../Service/batchService";
import { deleteBatchAction, saveAllBatchDetailsAction } from "./../../../redux/action/BatchAction";
import { toast } from "react-toastify";
import LoaderEffect from './../../LoaderEffect';

function BatchList({ history }) {
  let batchList = useSelector((state) => state.batchDetails.batches);
  let dispatch = useDispatch();


  let [loading, setLoading] = useState(false);

  let deleteBatch = (index, _id) => {
    removeBatch("delete-batch-by-id", _id).then((result) => {
      if (
        result.status === true &&
        result.result.deletedCount === 1 &&
        result !== undefined
      ) {
        dispatch(deleteBatchAction(index));
      } else toast.error("Unable to delete batch");
    });
  };


  useEffect(() => {
    getBatchList("get-batch-list").then((result) => {
      if (result === undefined) return false;
      dispatch(saveAllBatchDetailsAction(result.batchList));
      // (dispatch(saveAllBatchDetailsAction(result.batchList))?
      // setLoading(false):
      // setLoading(true));
    });
  }, []);
  return (
    // loading ? (<LoaderEffect />) :
    // setLoading(false)
    // (
    <div className="content">
      <div className="formComponent">
        <h4 className="text-align-center">List of Batches</h4>
        <div className="parent_card">
          {batchList.map((batch, index) => {
            return (
              <div
                className="card batch_card flex flex-direction-column"
                key={index}
              >
                <p className="batch_details" title="Batch Name">
                  {batch.batch_name}
                </p>
                <p className="batch_details" title="Course Name">
                  {batch.course_name}
                </p>
                <p className="batch_details" title="Trainer ID">
                  {batch.trainer_id}
                </p>
                {/* <p className="batch_details" title="Trainer ID">{batch.trainer_id}</p> */}
                <p className="batch_details" title="Number of Students">
                  {batch.no_of_students}
                </p>
                <div className="form-buttons">
                  <button onClick={() => deleteBatch(index, batch._id)}>
                    DELETE
                  </button>
                  <button
                    className="edit"
                    onClick={() => {
                      history.push("/batch/edit/" + batch._id);
                    }}
                  >
                    EDIT
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
  // );
}

export default BatchList;
