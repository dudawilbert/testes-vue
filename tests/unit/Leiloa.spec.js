import Leilao from '@/components/Leilao'
import { mount } from '@vue/test-utils'

const leilao = {
  produto: 'Um livro da casa do codigo',
  lanceInicial: 49,
  descricao: 'Um maravilhoso livro sobre Vue'
}

describe('Um leilão exibe os dados do produto', () => {
  // montou o componente e passou as props
  test('Exibe os dados do leilão no card', () => {
    const wrapper = mount(Leilao, {
      propsData: {
        leilao
      }
    })
    // procurou no componente as classes e pegou o elemento html
    const header = wrapper.find('.card-header').element
    const title = wrapper.find('.card-title').element
    const text = wrapper.find('.card-text').element
    // espera q o texto dos elementos sejam o conteudo do toContain(...
    expect(header.textContent).toContain(`Estamos leiloando um(a): ${leilao.produto}`)
    expect(title.textContent).toContain(`Lance inicial: R$ ${leilao.lanceInicial}`)
    expect(text.textContent).toContain(leilao.descricao)
  })
})
