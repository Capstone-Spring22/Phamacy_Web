import Select from "react-select";
import React, { useEffect, useState } from "react";

export default function AddProductCard({
  options,
  setProduct,
  product,
  index,
  handleAddQuantityBatch,
  setIndexUnit,
  setCountQuantity,
  drug,
  setcountPrice
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentNumBatches, setCurrentNumBatches] = useState(0);
  const [isBatches, setIsBatches] = useState(false);
  const [options2, setOptions2] = useState([]);

  const handleSelectProduct = (productId) => {
    const isBatch = drug.find((item) => item.id === productId).isBatches;
    setIsBatches(isBatch);
    setCurrentNumBatches(
      product.productImportDetails[index - 1]?.productBatches?.length || 0
    );
  };

  useEffect(() => {
    setCurrentNumBatches(
      product.productImportDetails[index - 1]?.productBatches?.length || 0
    );
  }, [product]);

  return (
    <div className="card-body" style={{ marginLeft: -30 }}>
      <div>
        <div
          style={{
            display: "flex",
            marginLeft: 100,
            padding: 30,
            flexWrap: "wrap",
          }}>
          <div className="mb-3" style={{ width: "30%", marginRight: 20 }}>
            <label className="form-label" htmlFor="basic-icon-default-phone">
              sản phẩm
            </label>
            <Select
              onChange={(selectedOption) => {
                setSelectedOption(selectedOption.value);
                handleSelectProduct(selectedOption.value);
                setOptions2(
                  selectedOption.unit.map((e) => ({
                    label: e.unitName,
                    value: e.id,
                  }))
                );
              }}
              options={options}
            />
          </div>
          <div className="mb-3" style={{ width: "30%", marginRight: 20 }}>
            <label className="form-label" htmlFor="basic-icon-default-phone">
              Đơn vị
            </label>

            {options2 && (
              <Select
                onChange={(selectedOption) => {
                  setProduct((product) => ({
                    ...product,
                    productImportDetails: [
                      ...product.productImportDetails.slice(0, index - 1),
                      {
                        ...product.productImportDetails[index - 1],
                        productId: selectedOption.value,
                      },
                      ...product.productImportDetails.slice(index),
                    ],
                  }));
                }}
                options={options2}
              />
            )}
          </div>
          <div className="mb-3" style={{ width: "30%", marginRight: 20 }}>
            <label className="form-label" htmlFor={`unitId${index}`}>
              Số lượng
            </label>
            <div className="input-group input-group-merge">
              <input
                type="text"
                id={`quantitative${index}`}
                className="form-control"
                placeholder="Định Lượng"
                aria-label="Unit Id"
                aria-describedby={`quantitative${index}2`}
                value={product?.productImportDetails[index - 1]?.quantity}
                onChange={(e) => {
                  setProduct((product) => ({
                    ...product,
                    productImportDetails: [
                      ...product.productImportDetails.slice(0, index - 1),
                      {
                        ...product.productImportDetails[index - 1],
                        quantity: e.target.value,
                      },
                      ...product.productImportDetails.slice(index),
                    ],
                  }));
                  setcountPrice((countprice)=>parseInt(countprice) + 1);
                }}
              />
            </div>
          </div>
          <div className="mb-3" style={{ width: "30%", marginRight: 20 }}>
            <label className="form-label" htmlFor={`unitId${index}`}>
              Giá
            </label>
            <div className="input-group input-group-merge">
              <input
                type="text"
                id={`sellQuantity${index}`}
                className="form-control"
                placeholder="Số lượng bán"
                aria-label="Unit Id"
                aria-describedby={`sellQuantity${index}2`}
                onChange={(e) => {
                  setProduct((product) => ({
                    ...product,
                    productImportDetails: [
                      ...product.productImportDetails.slice(0, index - 1),
                      {
                        ...product.productImportDetails[index - 1],
                        importPrice: parseInt(e.target.value),
                      },
                      ...product.productImportDetails.slice(index),
                    ],
                  }));
                  setcountPrice((countprice)=>parseInt(countprice) + 1);
                }}
              />
            </div>
          </div>
          {selectedOption &&
            isBatches &&
            Array.from({ length: currentNumBatches }, (_, j) => j + 1).map(
              (batchIndex) => (
                <React.Fragment key={`${index}-${batchIndex}`}>
                  <div
                    className="mb-3"
                    style={{ width: "30%", marginRight: 20 }}>
                    <label className="form-label">Hạn sử dụng</label>
                    <div className="input-group input-group-merge">
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Hạn sử dụng"
                        aria-label="expireDate"
                        onChange={(e) => {
                          setProduct((product) => ({
                            ...product,
                            productImportDetails: [
                              ...product.productImportDetails.slice(
                                0,
                                index - 1
                              ),
                              {
                                ...product.productImportDetails[index - 1],
                                productBatches: [
                                  ...product.productImportDetails[
                                    index - 1
                                  ].productBatches.slice(0, batchIndex - 1),
                                  {
                                    ...product.productImportDetails[index - 1]
                                      .productBatches[batchIndex - 1],
                                    expireDate: e.target.value,
                                  },
                                  ...product.productImportDetails[
                                    index - 1
                                  ].productBatches.slice(batchIndex),
                                ],
                              },
                              ...product.productImportDetails.slice(index),
                            ],
                          }));
                        }}
                      />
                    </div>
                  </div>
                  <div
                    className="mb-3"
                    style={{ width: "30%", marginRight: 20 }}>
                    <label className="form-label">Ngày sản xuất</label>
                    <div className="input-group input-group-merge">
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Ngày sản xuất"
                        aria-label="Unit Id"
                        onChange={(e) => {
                          setProduct((product) => ({
                            ...product,
                            productImportDetails: [
                              ...product.productImportDetails.slice(
                                0,
                                index - 1
                              ),
                              {
                                ...product.productImportDetails[index - 1],
                                productBatches: [
                                  ...product.productImportDetails[
                                    index - 1
                                  ].productBatches.slice(0, batchIndex - 1),
                                  {
                                    ...product.productImportDetails[index - 1]
                                      .productBatches[batchIndex - 1],
                                    manufactureDate: e.target.value,
                                  },
                                  ...product.productImportDetails[
                                    index - 1
                                  ].productBatches.slice(batchIndex),
                                ],
                              },
                              ...product.productImportDetails.slice(index),
                            ],
                          }));
                        }}
                      />
                    </div>
                  </div>
                  <div
                    className="mb-3"
                    style={{ width: "30%", marginRight: 20 }}>
                    <label
                      className="form-label"
                      htmlFor="basic-icon-default-email">
                      số lượng sản phẩm lô
                    </label>
                    <div className="input-group input-group-merge">
                      <input
                        type="text"
                        id="basic-icon-default-email"
                        className="form-control"
                        placeholder="Phone Number"
                        aria-label="Phone Number"
                        aria-describedby="basic-icon-default-email2"
                        onChange={(e) => {
                          handleAddQuantityBatch(index, batchIndex, e);
                          setIndexUnit(index);
                          setCountQuantity(
                            (countQuantity) => countQuantity + 1
                          );
                          // handleAddQuantity(index)
                        }}
                      />
                    </div>

                    <div className="form-text"></div>
                  </div>
                </React.Fragment>
              )
            )}
          {selectedOption && isBatches && (
            <button
              className="button-batches"
              onClick={() => {
                setProduct((product) => ({
                  ...product,
                  productImportDetails: [
                    ...product.productImportDetails.slice(0, index - 1),
                    {
                      ...product.productImportDetails[index - 1],
                      productBatches: [
                        ...product.productImportDetails[index - 1]
                          .productBatches,
                        {
                          // Khởi tạo giá trị mặc định cho trường mới
                          quantity: "",
                          manufactureDate: "",
                          expireDate: "",
                        },
                      ],
                    },
                    ...product.productImportDetails.slice(index),
                  ],
                }));
              }}>
              +
            </button>
          )}
        </div>
      </div>
      <hr />
    </div>
  );
}
