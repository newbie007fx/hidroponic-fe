import React, { useEffect, useState } from "react";
import automationService from "../../services/automation.service";
import { Link, useSearchParams } from "react-router-dom";
import moment from "moment";

const IndexAutomation = () => {
    const [automations, setAutomations] = useState([]);
    const [searchParams] = useSearchParams();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(13);
    const [isMaxPage, setIsMaxPage] = useState(false);

    useEffect(() => {
        let tmpPage = parseInt(searchParams.get("page"));
        if (tmpPage > 0) {
            setPage(tmpPage)
        }
        let tmpLimit = parseInt(searchParams.get("limit"));
        if (tmpLimit > 0) {
            setLimit(tmpLimit)
        }
    }, [searchParams])

    useEffect(() => {
        let offset = (page - 1) * limit;
        let queryParams = {
            "offset": offset,
            "limit": limit
        }
        automationService.getAllAutomation(queryParams).then(
            (response) => {
                if (response.data.data) {
                    setIsMaxPage(false);
                    setAutomations(response.data.data);
                } else {
                    setIsMaxPage(true);
                    setAutomations([]);
                }
            }).catch(
                (error) => {
                    console.log(error);
                }
            );
    }, [limit, page]);

    return (
        <div className="row">
            <div className="col-lg-12 mb-4 order-0">
                <div className="card">
                    <h5 className="card-header">Automation History</h5>
                    <div className="card-body">
                        <div className="table-responsive text-nowrap">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>Plant Name</th>
                                        <th>Plant Varieties</th>
                                        <th>Target PPM</th>
                                        <th>Accuration</th>
                                        <th>Duration</th>
                                        <th>Triggered At</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="table-border-bottom-0">
                                    {automations &&
                                        automations.map((automation, index) => (
                                            <tr key={index}>
                                                <td>{automation.plant.name}</td>
                                                <td>{automation.plant.varieties}</td>
                                                <td>{automation.target_ppm} PPM</td>
                                                <td>{automation.accuration}%</td>
                                                <td>{automation.duration} Seconds</td>
                                                <td>{moment(automation.triggered_at).format("DD-MMMM-YYYY HH:mm:ss")}</td>
                                                <td>{automation.status}</td>
                                                <td>
                                                    <Link to={"/automations/" + automation.id} className="nav-link">
                                                        <button
                                                            type="button"
                                                            className="btn p-0 dropdown-toggle hide-arrow"
                                                        >
                                                            <i className="bx bx-show-alt me-1"></i> Detail
                                                        </button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                            <div className="demo-inline-spacing">
                                <nav aria-label="Page navigation">
                                    <ul className="pagination">
                                        {page > 1 && <li className="page-item prev">
                                            <a className="page-link" href={"/automations?page=" + (page - 1) + "&limit=" + limit}><i className="tf-icon bx bx-chevron-left"></i></a>
                                        </li>}
                                        <li className="page-item active">
                                            <label className="page-link">{page}</label>
                                        </li>
                                        {!isMaxPage && automations.length === limit && <li className="page-item next">
                                            <a className="page-link" href={"/automations?page=" + (page + 1) + "&limit=" + limit}><i className="tf-icon bx bx-chevron-right"></i></a>
                                        </li>}
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IndexAutomation;
