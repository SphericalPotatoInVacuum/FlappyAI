class Matrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;

        this.data = [];
        for (let i = 0; i < rows; i++) {
            this.data[i] = [];
            for (let j = 0; j < cols; j++) {
                this.data[i][j] = 0;
            }
        }
    }

    static fromArray(n) {
        let m = new Matrix(n.length, 1);
        for (let i = 0; i < n.length; i++) {
            m.data[i][0] = n[i];
        }
        return m;
    }

    static multiply(m1, m2) {
        if (m1.cols !== m2.rows) {
            console.log('Number of cols of A must match number of rows of B')
            return undefined;
        }
        let res = new Matrix(m1.rows, m2.cols);
        for (let i = 0; i < res.rows; i++) {
            for (let j = 0; j < res.cols; j++) {
                for (let k = 0; k < m1.cols; k++) {
                    res.data[i][j] += m1.data[i][k] * m2.data[k][j];
                }
            }
        }
        return res;
    }

    toArray(n) {
        let arr = [];
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                arr.push(this.data[i][j]);
            }
        }
        return arr;
    }

    randomize(n) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] = Math.random() * 2 - 1;
            }
        }
    }

    add(n) {
        if (n instanceof Matrix) {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] += n.data[i][j];
                }
            }
        } else {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] += n;
                }
            }
        }
    }

    multiply(n) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] *= n;
            }
        }
    }

    transpose() {
        let res = new Matrix(this.cols, this.rows);
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                res.data[j][i] = this.data[i][j];
            }
        }
        return res;
    }

    map(fn) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] = fn(this.data[i][j]);
            }
        }
    }

    print() {
        console.table(this.data);
    }

    copy() {
        let m = new Matrix(this.rows, this.cols);
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                m.data[i][j] = this.data[i][j];
            }
        }
        return m;
    }

    static deserialize(x) {
        if (typeof x == 'string') {
            x = JSON.parse(x);
        }
        let m = new Matrix(x.rows, x.cols);
        m.data = x.data;
        return m;
    }
}