import Leiloeiro from '@/views/Leiloeiro'
import { mount } from '@vue/test-utils'
import { getLeilao, getLances } from '@/http'
import flushPromises from 'flush-promises'
jest.mock('@/http')
const leilao = {
  produto: 'Livro da casa do codigo',
  lanceInicial: 50,
  descricao: 'Livro bem bacana sobre Vue'
}
const lances = [
  {
    id: 1,
    valor: 1001,
    data: '2020-06-13T18:04:26.826Z',
    leilao_id: 1
  },
  {
    id: 2,
    valor: 1005,
    data: '2020-06-13T18:10:26.826Z',
    leilao_id: 1
  },
  {
    id: 3,
    valor: 1099,
    data: '2020-06-13T18:19:26.826Z',
    leilao_id: 1
  }
]
describe('Leuloeiro inicia um leilão que não possui lances', () => {
  test('avisa quando nao existem lances', async () => {
    // fazendo os gest
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce([])
    // montando o componente
    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })
    // agurdando a promisse resolver
    await flushPromises()
    const alerta = wrapper.find('.alert-dark')
    expect(alerta.exists()).toBe(true)
  })
})

describe('Um leiloeiro exibe os lances existentes', () => {
  test('Nao mostra o aviso de "sem lances"', async () => {
    // fazendo os gest
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce(lances)
    // montando o componente
    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })
    // agurdando a promisse resolver
    await flushPromises()
    const alerta = wrapper.find('.alert-dark')
    expect(alerta.exists()).toBe(false)
  })
  test('Possui uma lista de lances"', async () => {
    // fazendo os gest
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce(lances)
    // montando o componente
    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })
    // agurdando a promisse resolver
    await flushPromises()
    const alerta = wrapper.find('.list-inline')
    expect(alerta.exists()).toBe(true)
  })
})
describe('Um leiloeiro comunica os valores de maior e menor lance', () => {
  test('Mostra o maior lance daquele leilão', async () => {
    // fazendo os gest
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce(lances)
    // montando o componente
    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })
    // agurdando a promisse resolver
    await flushPromises()
    const maiorLance = wrapper.find('.maior-lance')
    expect(maiorLance.element.textContent).toContain('Maior lance: R$ 1099')
  })
  test('Mostra o mneor lance daquele leilão', async () => {
    // fazendo os gest
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce(lances)
    // montando o componente
    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })
    // agurdando a promisse resolver
    await flushPromises()
    const menorLance = wrapper.find('.menor-lance')
    expect(menorLance.element.textContent).toContain('Menor lance: R$ 1001')
  })
})
