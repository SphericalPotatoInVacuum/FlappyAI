function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

class NeuralNetwork {
    constructor(input_nodes, hidden_nodes, output_nodes) {
        this.input_nodes = input_nodes;
        this.hidden_nodes = hidden_nodes;
        this.output_nodes = output_nodes;

        // Initialize weights
        this.weights_ih = new Matrix(hidden_nodes, input_nodes);
        this.weights_ho = new Matrix(output_nodes, hidden_nodes);
        this.weights_ih.randomize();
        this.weights_ho.randomize();

        // Initialize biases
        this.bias_h = new Matrix(hidden_nodes, 1);
        this.bias_o = new Matrix(output_nodes, 1);

        this.bias_h.randomize();
        this.bias_o.randomize();
    }

    predict(input_array) {
        let input = Matrix.fromArray(input_array);

        // Generate hidden outputs
        let hidden = Matrix.multiply(this.weights_ih, input);
        hidden.add(this.bias_h);
        // Apply activation function
        hidden.map(sigmoid);

        // Generate output
        let output = Matrix.multiply(this.weights_ho, hidden);
        output.add(this.bias_o);
        // Apply activation function
        output.map(sigmoid);

        return output.toArray();
    }

    mutate(func) {
        this.weights_ih.map(func);
        this.weights_ho.map(func);
        this.bias_h.map(func);
        this.bias_o.map(func);
    }

    copy() {
        let res = new NeuralNetwork(this.input_nodes, this.hidden_nodes, this.output_nodes);
        res.weights_ih = this.weights_ih.copy();
        res.weights_ho = this.weights_ho.copy();
        res.bias_h = this.bias_h.copy();
        res.bias_o = this.bias_o.copy();
        return res;
    }

    serialize() {
        return JSON.stringify(this);
    }

    static deserialize(x) {
        if (typeof x == 'string') {
            x = JSON.parse.x;
        }
        let nn = new NeuralNetwork(x.input_nodes, x.hidden_nodes, x.output_nodes);
        nn.weights_ih = Matrix.deserialize(x.weights_ih);
        nn.weights_ho = Matrix.deserialize(x.weights_ho);
        nn.bias_h = Matrix.deserialize(x.bias_h);
        nn.bias_o = Matrix.deserialize(x.bias_o);
        return nn;
    }
}