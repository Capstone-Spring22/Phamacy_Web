import Select from "react-select";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UpdateProductCard({
  options,
  setProduct,
  product,
  index,
  handleAddQuantityBatch,
  setIndexUnit,
  setCountQuantity,
  drug,
  setcountPrice,
  handleDeleteUnit,
}) {
  const [selectedOption, setSelectedOption] = useState({
    value: product?.productImportDetails[index - 1]?.productId,
    label: "",
  });
  const [currentNumBatches, setCurrentNumBatches] = useState(0);
  const [isBatches, setIsBatches] = useState(drug.find((x) => 
  x.productUnitReferences.find((y) => 
    y.id === product?.productImportDetails[
      index - 1
    ]?.productId
  )
)?.isBatches);
  const [options2, setOptions2] = useState(
    options?.find((x) =>
      x.unit.find(
        (y) => y.id === product?.productImportDetails[index - 1]?.productId
      )
    )?.unit
  );
  const [options3, setOptions3] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    if (typeof options2 !== "undefined") {
      console.log(options2);
      setOptions3(
        options2.map((e) => ({
          label: e.unitName,
          value: e.id,
        }))
      );
      setIsLoading(false);
    }
  }, [options2]);

  const [message, setMessage] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const getMessageAPI = async (productid, quantity) => {
    if (productid && quantity > 0) {
      const res = await axios.get(
        `https://betterhealthapi.azurewebsites.net/api/v1/ProductImport/Message?ProductId=${productid}&Quantity=${quantity}`
      );
      setMessage(res.data.templateMessage);
      console.log("display", res.data.templateMessage);
    }
  };

  const handleSelectProduct = (productId) => {
    const isBatch = drug.find((item) => item.id === productId).isBatches;
    setIsBatches(isBatch);
    setCurrentNumBatches(
      product.productImportDetails[index - 1]?.productBatches?.length || 0
    );
    if (!isBatch) {
      setProduct((product) => ({
        ...product,
        productImportDetails: [
          ...product.productImportDetails.slice(0, index - 1),
          {
            ...product.productImportDetails[index - 1],
            productId: "",
            quantity: 0,
            importPrice: 0,
            productBatches: null,
          },
          ...product.productImportDetails.slice(index),
        ],
      }));
    } else {
      setProduct((product) => ({
        ...product,
        productImportDetails: [
          ...product.productImportDetails.slice(0, index - 1),

          {
            ...product.productImportDetails[index - 1],
            productId: "",
            quantity: 0,
            importPrice: 0,
            productBatches: [
              {
                quantity: 0,
                manufactureDate: "",
                expireDate: "",
              },
            ],
          },
          ...product.productImportDetails.slice(index),
        ],
      }));
    }
  };

  useEffect(() => {
    setCurrentNumBatches(
      product.productImportDetails[index - 1]?.productBatches?.length || 0
    );
  }, [product]);
  useEffect(() => {
    getMessageAPI(
      product.productImportDetails[index - 1].productId,
      product.productImportDetails[index - 1].quantity
    );
  }, [
    product.productImportDetails[index - 1].productId,
    product.productImportDetails[index - 1].quantity,
  ]);

  return (
    <div className="card-body" style={{ marginLeft: -30 }}>
      <div>
        <div
          style={{
            display: "flex",
            marginLeft: 100,
            padding: 30,
            flexWrap: "wrap",
          }}
        >
          <div className="mb-3" style={{ width: "20%", marginRight: 20 }}>
            <label className="form-label" htmlFor="basic-icon-default-phone">
              sản phẩm
            </label>
            <Select
              placeholder="Chọn Sản Phẩm "
              value={options.find((x) =>
                x.unit.find((y) => y.id === selectedOption.value)
              )}
              onChange={(selectedOption) => {
                setSelectedOption(selectedOption);
                setIsEdited(true);
                handleSelectProduct(selectedOption.value);
                setOptions3(
                  selectedOption.unit.map((e) => ({
                    label: e.unitName,
                    value: e.id,
                  }))
                );
              }}
              noOptionsMessage={({ inputValue }) =>
                inputValue ? options : "Đang Tải Sản Phẩm..."
              }
              options={options}
            />
            <div className="form-text"> Chọn sản phẩm để nhập hàng</div>
          </div>
          <div className="mb-3" style={{ width: "20%", marginRight: 20 }}>
            <label className="form-label" htmlFor="basic-icon-default-phone">
              Đơn vị
            </label>
            <div>
              {isLoading ? (
                <div>Đang tải...</div>
              ) : (
                <div>
                  {options3 && (
                    <Select
                      placeholder="Chọn Đơn Vị"
                      value={
                        options3?.find(
                          (option) =>
                            option?.value ===
                            product?.productImportDetails[index - 1]?.productId
                        )
                          ? options3?.find(
                              (option) =>
                                option?.value ===
                                product?.productImportDetails[index - 1]
                                  ?.productId
                            )
                          : ""
                      }
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
                      noOptionsMessage={({ inputValue }) =>
                        inputValue ? options2 : "Vui Lòng Chọn Sản Phẩm"
                      }
                      options={options3}
                    />
                  )}
                </div>
              )}
            </div>

            <div className="form-text">
              {" "}
              Vui lòng chọn sản phẩm trước khi chọn đơn vị
            </div>
          </div>

          <div className="mb-3" style={{ width: "20%", marginRight: 20 }}>
            <label className="form-label" htmlFor={`unitId${index}`}>
              Số lượng
            </label>
            <div className="input-group input-group-merge">
              {isBatches ? (
                <input
                  type="number"
                  id={`quantitative${index}`}
                  className="form-control"
                  placeholder="Số Lượng"
                  aria-label="Unit Id"
                  readOnly
                  aria-describedby={`quantitative${index}2`}
                  value={product?.productImportDetails[index - 1]?.quantity}
                />
              ) : (
                <input
                  type="number"
                  id={`quantitative${index}`}
                  className="form-control"
                  placeholder="Số Lượng"
                  aria-label="Unit Id"
                  aria-describedby={`quantitative${index}2`}
                  value={product?.productImportDetails[index - 1]?.quantity}
                  onChange={(e) => {
                    setcountPrice((countprice) => parseInt(countprice) + 1);
                    const value = parseInt(e.target.value);
                    if (!value) {
                      setProduct((product) => ({
                        ...product,
                        productImportDetails: [
                          ...product.productImportDetails.slice(0, index - 1),
                          {
                            ...product.productImportDetails[index - 1],
                            quantity: 0,
                          },
                          ...product.productImportDetails.slice(index),
                        ],
                      }));
                    } else if (value > 0) {
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
                    } else {
                      setProduct((product) => ({
                        ...product,
                        productImportDetails: [
                          ...product.productImportDetails.slice(0, index - 1),
                          {
                            ...product.productImportDetails[index - 1],
                            quantity: 0,
                          },
                          ...product.productImportDetails.slice(index),
                        ],
                      }));
                    }
                  }}
                />
              )}
            </div>
            <div className="form-text"> Số lượng phải là số lớn hơn 0</div>
          </div>
          <div className="mb-3" style={{ width: "30%", marginRight: 20 }}>
            <label className="form-label" htmlFor={`unitId${index}`}>
              Giá nhập (vnđ) (tính theo 1 cái)
            </label>
            <div className="input-group input-group-merge">
              <input
                type="number"
                id={`sellQuantity${index}`}
                className="form-control"
                placeholder="Giá nhập"
                aria-label="Unit Id"
                value={product?.productImportDetails[index - 1]?.importPrice}
                aria-describedby={`sellQuantity${index}2`}
                onChange={(e) => {
                  setcountPrice((countprice) => parseInt(countprice) + 1);
                  const value = parseInt(e.target.value);
                  if (!value) {
                    setProduct((product) => ({
                      ...product,
                      productImportDetails: [
                        ...product.productImportDetails.slice(0, index - 1),
                        {
                          ...product.productImportDetails[index - 1],
                          importPrice: 0,
                        },
                        ...product.productImportDetails.slice(index),
                      ],
                    }));
                  } else if (value > 0) {
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
                  } else {
                    setProduct((product) => ({
                      ...product,
                      productImportDetails: [
                        ...product.productImportDetails.slice(0, index - 1),
                        {
                          ...product.productImportDetails[index - 1],
                          importPrice: 0,
                        },
                        ...product.productImportDetails.slice(index),
                      ],
                    }));
                  }
                }}
              />
            </div>
            <div className="form-text">
              Giá của sản phẩm nhập phải là số lớn hơn 0
            </div>
          </div>

          {isEdited ? (
            <div>
              {selectedOption && isBatches && (
                <div className="productimport-border">
                  {selectedOption &&
                    isBatches &&
                    Array.from(
                      { length: currentNumBatches },
                      (_, j) => j + 1
                    ).map((batchIndex) => (
                      <React.Fragment key={`${index}-${batchIndex}`}>
                        <div className="productimport">
                          <div
                            className="mb-3"
                            style={{ width: "30%", marginRight: 20 }}
                          >
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
                                        ...product.productImportDetails[
                                          index - 1
                                        ],
                                        productBatches: [
                                          ...product.productImportDetails[
                                            index - 1
                                          ].productBatches.slice(
                                            0,
                                            batchIndex - 1
                                          ),
                                          {
                                            ...product.productImportDetails[
                                              index - 1
                                            ].productBatches[batchIndex - 1],
                                            manufactureDate: e.target.value,
                                          },
                                          ...product.productImportDetails[
                                            index - 1
                                          ].productBatches.slice(batchIndex),
                                        ],
                                      },
                                      ...product.productImportDetails.slice(
                                        index
                                      ),
                                    ],
                                  }));
                                }}
                              />
                            </div>
                            <div className="form-text">
                              Chọn ngày sản xuất của sản phẩm trong lô hàng
                            </div>
                          </div>
                          <div
                            className="mb-3"
                            style={{ width: "30%", marginRight: 20 }}
                          >
                            <label className="form-label">Hạn sử dụng</label>
                            <div className="input-group input-group-merge">
                              <input
                                type="date"
                                className="form-control input-importproduct"
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
                                        ...product.productImportDetails[
                                          index - 1
                                        ],
                                        productBatches: [
                                          ...product.productImportDetails[
                                            index - 1
                                          ].productBatches.slice(
                                            0,
                                            batchIndex - 1
                                          ),
                                          {
                                            ...product.productImportDetails[
                                              index - 1
                                            ].productBatches[batchIndex - 1],
                                            expireDate: e.target.value,
                                          },
                                          ...product.productImportDetails[
                                            index - 1
                                          ].productBatches.slice(batchIndex),
                                        ],
                                      },
                                      ...product.productImportDetails.slice(
                                        index
                                      ),
                                    ],
                                  }));
                                }}
                              />
                            </div>
                            <div className="form-text">
                              Chọn hạn sử dụng của sản phẩm trong lô hàng
                            </div>
                          </div>

                          <div
                            className="mb-3"
                            style={{ width: "30%", marginRight: 20 }}
                          >
                            <label
                              className="form-label"
                              htmlFor="basic-icon-default-email"
                            >
                              số lượng sản phẩm lô
                            </label>
                            <div className="input-group input-group-merge">
                              <input
                                type="number"
                                id="basic-icon-default-email"
                                className="form-control"
                                placeholder="Số Lượng Sản Phẩm Lô"
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

                            <div className="form-text">
                              Số lượng sản phẩm lô phải là số lớn hơn 0
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                    ))}
                </div>
              )}
            </div>
          ) : (
            <div style={{ width: "160%" }}>
              {product.productImportDetails[index - 1].productBatches.length ===
              0 ? (
                <div></div>
              ) : (
                <div className="productimport-border">
                  {Array.from(
                    {
                      length:
                        product.productImportDetails[index - 1].productBatches
                          .length,
                    },
                    (_, j) => j + 1
                  ).map((batchIndex) => (
                    <React.Fragment key={`${index}-${batchIndex}`}>
                      <div className="productimport">
                        {" "}
                        <div
                          className="mb-3"
                          style={{
                            width: "30%",
                            marginRight: 20,
                          }}
                        >
                          <label
                            className="form-label"
                            htmlFor={`unitId${index}`}
                          >
                            Ngày sản xuất
                          </label>
                          <div className="input-group input-group-merge">
                            <input
                              type="date"
                              id={`barCode${index}`}
                              className="form-control"
                              placeholder="Unit Id"
                              aria-label="Unit Id"
                              aria-describedby={`barCode${index}2`}
                              value={
                                product.productImportDetails[index - 1]
                                  .productBatches[batchIndex - 1]
                                  .manufactureDate
                                  ? new Date(
                                      product.productImportDetails[
                                        index - 1
                                      ].productBatches[
                                        batchIndex - 1
                                      ].manufactureDate
                                    )
                                      .toISOString()
                                      .slice(0, 10)
                                  : ""

                                // ? new Date(
                                //     product.productImportDetails[
                                //       index - 1
                                //     ].productBatches
                                //       .map(
                                //         (productBatch) =>
                                //           productBatch.manufactureDate
                                //       )
                                //       .join(", ")
                                //   )
                                //     .toISOString()
                                //     .substr(0, 10)
                                // : ""
                              }
                              onChange={(e) => {
                                setProduct((product) => ({
                                  ...product,
                                  productImportDetails: [
                                    ...product.productImportDetails.slice(
                                      0,
                                      index - 1
                                    ),
                                    {
                                      ...product.productImportDetails[
                                        index - 1
                                      ],
                                      productBatches: [
                                        ...product.productImportDetails[
                                          index - 1
                                        ].productBatches.slice(
                                          0,
                                          batchIndex - 1
                                        ),
                                        {
                                          ...product.productImportDetails[
                                            index - 1
                                          ].productBatches[batchIndex - 1],
                                          manufactureDate: e.target.value,
                                        },
                                        ...product.productImportDetails[
                                          index - 1
                                        ].productBatches.slice(batchIndex),
                                      ],
                                    },
                                    ...product.productImportDetails.slice(
                                      index
                                    ),
                                  ],
                                }));
                              }}
                            />
                          </div>
                        </div>
                        <div
                          className="mb-3"
                          style={{
                            width: "30%",
                            marginRight: 20,
                          }}
                        >
                          <label
                            className="form-label"
                            htmlFor={`unitId${index}`}
                          >
                            Hạn sử dụng
                          </label>
                          <div className="input-group input-group-merge">
                            <input
                              type="date"
                              id={`price${index}`}
                              className="form-control"
                              placeholder="Unit Id"
                              aria-label="Unit Id"
                              aria-describedby={`price${index}2`}
                              value={
                                product.productImportDetails[index - 1]
                                  .productBatches[batchIndex - 1].expireDate
                                  ? new Date(
                                      product.productImportDetails[
                                        index - 1
                                      ].productBatches[
                                        batchIndex - 1
                                      ].expireDate
                                    )
                                      .toISOString()
                                      .slice(0, 10)
                                  : ""

                                // ? new Date(
                                //     product.productImportDetails[
                                //       index - 1
                                //     ].productBatches
                                //       .map(
                                //         (productBatch) =>
                                //           productBatch.expireDate
                                //       )
                                //       .join(", ")
                                //   )
                                //     .toISOString()
                                //     .substr(0, 10)
                                // : ""
                              }
                              onChange={(e) => {
                                setProduct((product) => ({
                                  ...product,
                                  productImportDetails: [
                                    ...product.productImportDetails.slice(
                                      0,
                                      index - 1
                                    ),
                                    {
                                      ...product.productImportDetails[
                                        index - 1
                                      ],
                                      productBatches: [
                                        ...product.productImportDetails[
                                          index - 1
                                        ].productBatches.slice(
                                          0,
                                          batchIndex - 1
                                        ),
                                        {
                                          ...product.productImportDetails[
                                            index - 1
                                          ].productBatches[batchIndex - 1],
                                          expireDate: e.target.value,
                                        },
                                        ...product.productImportDetails[
                                          index - 1
                                        ].productBatches.slice(batchIndex),
                                      ],
                                    },
                                    ...product.productImportDetails.slice(
                                      index
                                    ),
                                  ],
                                }));
                              }}
                            />
                          </div>
                        </div>
                        <div
                          className="mb-3"
                          style={{
                            width: "30%",
                            marginRight: 20,
                          }}
                        >
                          <label
                            className="form-label"
                            htmlFor="basic-icon-default-email"
                          >
                            số lượng sản phẩm lô
                          </label>

                          <div className="input-group input-group-merge">
                            <input
                              type="number"
                              id="basic-icon-default-email"
                              className="form-control"
                              placeholder="Số Lượng Sản Phẩm Lô"
                              aria-label="Phone Number"
                              aria-describedby="basic-icon-default-email2"
                              value={
                                product.productImportDetails[index - 1]
                                  .productBatches[batchIndex - 1].quantity
                              }
                              onChange={(e) => {
                                handleAddQuantityBatch(index, batchIndex, e);
                                setIndexUnit(index);
                                setCountQuantity(
                                  (countQuantity) => countQuantity + 1
                                );
                                setProduct({
                                  ...product,
                                  productImportDetails: [
                                    ...product.productImportDetails.slice(
                                      0,
                                      index - 1
                                    ),
                                    {
                                      ...product.productImportDetails[
                                        index - 1
                                      ],
                                      productBatches: [
                                        ...product.productImportDetails[
                                          index - 1
                                        ].productBatches.slice(
                                          0,
                                          batchIndex - 1
                                        ),
                                        {
                                          ...product.productImportDetails[
                                            index - 1
                                          ].productBatches[batchIndex - 1],
                                          quantity: parseInt(e.target.value),
                                        },
                                        ...product.productImportDetails[
                                          index - 1
                                        ].productBatches.slice(batchIndex),
                                      ],
                                      quantity: product.productImportDetails[
                                        index - 1
                                      ].productBatches.reduce(
                                        (total, curent) =>
                                          total + curent.quantity,
                                        0
                                      ),
                                    },
                                    ...product.productImportDetails.slice(
                                      index
                                    ),
                                  ],
                                });
                              }}
                            />
                          </div>

                          <div className="form-text"></div>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}{" "}
                </div>
              )}
            </div>
          )}

          {message && (
            <div
              style={{ marginTop: 20, fontStyle: "oblique", color: "#E96479" }}
            >
              {message}
            </div>
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
              }}
            >
              + Thêm Lô
            </button>
          )}
        </div>
      </div>
      <hr />
    </div>
  );
}
