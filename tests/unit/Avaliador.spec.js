import Avaliador from '@/views/Avaliador'
import { mount, RouterLinkStub } from '@vue/test-utils'
import { getLeiloes } from '@/http'
import flushPromises from 'flush-promises'
jest.mock('@/http')
const leiloes = [
  {
    produto: 'Livro da Casa do Codigo',
    lanceInicial: 50,
    descricao: 'Livro sobre Teste Unitario'
  },
  {
    produto: 'Livro da Casa do Codigo',
    lanceInicial: 50,
    descricao: 'Livro sobre Teste Unitario'
  }
]
describe('Um avaliador que e conecta com a API', () => {
  test('mostra os leilos retornados pela API', async () => {
    // faz o get leiloes
    getLeiloes.mockResolvedValueOnce(leiloes)
    // monta o avaliador
    const wrapper = mount(Avaliador, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    // espera o get
    await flushPromises()
    // procura todas as classes .leilao e conta quantas tem
    const totalLeiloesExibidos = wrapper.findAll('.leilao').length
    // espera que o total seja igual a lista
    expect(totalLeiloesExibidos).toBe(leiloes.length)
  })
  test('não há leilos retornados pela API', async () => {
    // faz o get leiloes
    getLeiloes.mockResolvedValueOnce([])
    // monta o avaliador
    const wrapper = mount(Avaliador, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    // espera o get
    await flushPromises()
    // procura todas as classes .leilao e conta quantas tem
    const totalLeiloesExibidos = wrapper.findAll('.leilao').length
    // espera que o total seja igual a lista
    expect(totalLeiloesExibidos).toBe(0)
  })
})
