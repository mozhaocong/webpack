const babelTypes = require('@babel/types');
module.exports = function () {
    return {
        visitor: {
            BinaryExpression(path) {
                console.log('1111111111111', path.node.operator)

                // console.log('node.operator', node.operator, node.left.value, node.right.value)
                // path.replaceWith(babelTypes.binaryExpression(node.operator, node.left.value, node.right.value))
                if(path.node.operator === '+') {
                    const node =path.node
                    const number = babelTypes.numericLiteral(node.left.value+node.right.value);
                    // const data =  babelTypes.binaryExpression("+",number,number)
                    path.replaceWith(number)
                }
                // 拿到节点
                // const node = path.node
                // console.log('ArrowFunctionExpression -> node', node)

            }
        }
    }
}


