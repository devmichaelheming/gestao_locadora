import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;

    .site-page-header {
        width: 100%;
        border: 1px solid rgb(235, 237, 240);
        border-bottom: none;
    }
`;

export const ContainerTable = styled.div`
    width: 100%;
    height: 80%;
    display: flex;
    align-items: flex-start;
    justify-content: center;

    .ant-table-wrapper {
        width: 100%;
        padding: 20px;
        border: 1px solid var(--primary);

        .group-buttons {
            display: flex;
            gap: 15px;

            .btn-action:nth-child(1) {
                color: #389e0d;

                &:hover {
                    color: #73d13d;
                }
            }
            .btn-action:nth-child(2) {
                color: #d9363e;

                &:hover {
                    color: #ff7875;
                }
            }
            
            .btn-action {
                border: none;
                cursor: pointer;
                background: transparent;
            }
        }
    }
`;