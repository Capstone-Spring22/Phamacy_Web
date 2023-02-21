import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  {/* {Array.from(
                            { length: imageInputCount },
                            (_, j) => j + 1
                          ).map((index) => (
                            <div
                              className="mb-3"
                              key={index}
                              style={{ width: "95%" }}
                            >
                              <label
                                className="form-label"
                                htmlFor={`image${index}`}
                              >
                                Image {index + 1}
                              </label>
                              <div className="input-group input-group-merge">
                                <input
                                  type="file"
                                  id={`image${index}`}
                                  className="form-control"
                                  placeholder="Phone Number"
                                  aria-label="Phone Number"
                                  aria-describedby={`image${index}`}
                                  onChange={(e) => {
                                    setProduct({
                                      ...product,
                                      productDetailModel: [
                                        {
                                          ...product.productDetailModel[0],
                                          imageURL: [
                                            ...product.productDetailModel[0].imageURL.slice(
                                              0,
                                              index
                                            ),
                                            {
                                              ...product.productDetailModel[0]
                                                .imageURL[index],
                                              imageURL: e.target.value,
                                            },
                                            ...product.productDetailModel[0].imageURL.slice(
                                              index + 1
                                            ),
                                          ],
                                        },
                                        ...product.productDetailModel.slice(1),
                                      ],
                                    });
                                  }}
                                />
                              </div>
                              <div className="form-text"></div>
                            </div> */}
                              {/* ))} */}
                              {/* <button onClick={handleAddImage}>Thêm ảnh</button> */}
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
